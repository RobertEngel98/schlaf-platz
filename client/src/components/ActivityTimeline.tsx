import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  RefreshCw,
  Phone,
  Mail,
  CheckSquare,
  Edit3,
  Send,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Activity {
  id: string;
  activityType: string;
  title: string;
  description?: string;
  userName?: string;
  oldValue?: string;
  newValue?: string;
  createdAt: string;
}

interface ActivityTimelineProps {
  entityType: string; // 'account', 'contact', 'lead', etc.
  entityId: string;
}

// ---------------------------------------------------------------------------
// Icon / color mapping
// ---------------------------------------------------------------------------

const activityMeta: Record<
  string,
  { icon: typeof MessageSquare; color: string; bg: string }
> = {
  comment: { icon: MessageSquare, color: "#0176d3", bg: "#e1f0ff" },
  status_change: { icon: RefreshCw, color: "#2e844a", bg: "#d4edda" },
  call_logged: { icon: Phone, color: "#7b2d8e", bg: "#f0e1f7" },
  email_sent: { icon: Mail, color: "#dd7a01", bg: "#fff3e0" },
  task_created: { icon: CheckSquare, color: "#0891b2", bg: "#e0f7fa" },
  field_change: { icon: Edit3, color: "#706e6b", bg: "#f3f2f2" },
};

const defaultMeta = { icon: MessageSquare, color: "#706e6b", bg: "#f3f2f2" };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "gerade eben";
  if (mins < 60) return `vor ${mins} Min.`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `vor ${hours} Std.`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `vor ${days} Tagen`;
  return new Date(dateStr).toLocaleDateString("de-DE");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ActivityTimeline({
  entityType,
  entityId,
}: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);

  // ---- Fetch activities ----------------------------------------------------

  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/activities?entityType=${encodeURIComponent(entityType)}&entityId=${encodeURIComponent(entityId)}`,
        { credentials: "include" },
      );
      if (res.ok) {
        const data: Activity[] = await res.json();
        // Newest first
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setActivities(data);
      }
    } catch {
      // silently fail – empty list is fine
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    setLoading(true);
    fetchActivities();
  }, [fetchActivities]);

  // ---- Post comment --------------------------------------------------------

  const handlePost = async () => {
    const text = commentText.trim();
    if (!text || posting) return;

    setPosting(true);
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityType,
          entityId,
          activityType: "comment",
          title: "Kommentar",
          description: text,
        }),
      });
      if (res.ok) {
        setCommentText("");
        await fetchActivities();
      }
    } catch {
      // silently fail
    } finally {
      setPosting(false);
    }
  };

  // ---- Render --------------------------------------------------------------

  return (
    <div className="bg-white rounded-lg border border-[#e5e5e5] overflow-hidden">
      {/* ---- Header ---- */}
      <div className="px-3 sm:px-5 py-3 border-b border-[#e5e5e5]">
        <h3 className="text-[13px] font-bold text-[#181818] uppercase tracking-wider">
          Aktivitäten
        </h3>
      </div>

      {/* ---- Comment input ---- */}
      <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-[#e5e5e5]">
        <textarea
          className="w-full border border-[#c9c7c5] rounded-md px-3 py-2 text-[13px] text-[#181818] placeholder-[#706e6b] resize-none focus:outline-none focus:ring-2 focus:ring-[#0176d3] focus:border-[#0176d3] transition-colors"
          rows={3}
          placeholder="Kommentar schreiben..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              handlePost();
            }
          }}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handlePost}
            disabled={!commentText.trim() || posting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0176d3] text-white text-[13px] font-medium rounded-md hover:bg-[#014486] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            {posting ? "Wird gepostet..." : "Posten"}
          </button>
        </div>
      </div>

      {/* ---- Timeline ---- */}
      <div className="px-3 sm:px-5 py-3 sm:py-4">
        {loading ? (
          <div className="text-[13px] text-[#706e6b] text-center py-6">
            Laden...
          </div>
        ) : activities.length === 0 ? (
          <div className="text-[13px] text-[#706e6b] text-center py-6">
            Noch keine Aktivitäten
          </div>
        ) : (
          <div className="relative">
            {/* Vertical connecting line */}
            <div
              className="absolute left-4 top-4 bottom-4 w-px bg-[#e5e5e5]"
              aria-hidden="true"
            />

            <ul className="space-y-5">
              {activities.map((activity) => {
                const meta =
                  activityMeta[activity.activityType] ?? defaultMeta;
                const Icon = meta.icon;

                return (
                  <li key={activity.id} className="relative flex gap-3">
                    {/* Icon circle */}
                    <div
                      className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: meta.bg }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: meta.color }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      {/* Top line: user + title + time */}
                      <p className="text-[13px] text-[#181818] leading-snug">
                        {activity.userName && (
                          <span className="font-bold">
                            {activity.userName}
                          </span>
                        )}{" "}
                        <span>{activity.title}</span>{" "}
                        <span className="text-[11px] text-[#706e6b]">
                          &middot; {relativeTime(activity.createdAt)}
                        </span>
                      </p>

                      {/* Description */}
                      {activity.description && (
                        <p className="mt-1 text-[13px] text-[#444] whitespace-pre-wrap leading-relaxed">
                          {activity.description}
                        </p>
                      )}

                      {/* Field change: old → new */}
                      {activity.activityType === "field_change" &&
                        (activity.oldValue || activity.newValue) && (
                          <p className="mt-1 text-[12px] text-[#706e6b]">
                            <span className="line-through">
                              {activity.oldValue || "–"}
                            </span>{" "}
                            <span className="mx-1">&rarr;</span>{" "}
                            <span className="font-medium text-[#181818]">
                              {activity.newValue || "–"}
                            </span>
                          </p>
                        )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
