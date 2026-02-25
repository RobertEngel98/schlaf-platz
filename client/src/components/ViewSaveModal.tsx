import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { ListView } from "../lib/api";

interface ViewSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    isDefault: boolean;
    isPinned: boolean;
  }) => void;
  editView?: ListView | null;
}

export default function ViewSaveModal({
  isOpen,
  onClose,
  onSave,
  editView,
}: ViewSaveModalProps) {
  const [name, setName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (editView) {
      setName(editView.name);
      setIsDefault(editView.isDefault);
      setIsPinned(editView.isPinned);
    } else {
      setName("");
      setIsDefault(false);
      setIsPinned(false);
    }
  }, [editView, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), isDefault, isPinned });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl w-[420px] max-w-[90vw]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            {editView ? "Ansicht bearbeiten" : "Neue Listenansicht"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name der Ansicht
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. Meine offenen Leads"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/30 focus:border-brand"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/30"
              />
              <span className="text-sm text-gray-700">Anpinnen</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand/30"
              />
              <span className="text-sm text-gray-700">Als Standardansicht setzen</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-dark disabled:opacity-50"
            >
              {editView ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
