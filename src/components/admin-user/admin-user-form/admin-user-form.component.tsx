import { useEffect, useState } from "react";
import type { UserAdmin } from "../../../types/admin-user.interface";
import "./admin-user-form.scss";

interface Props {
  editingUser: UserAdmin | null;
  onSubmit: (user: UserAdmin) => void;
  onClose: () => void;
}

export default function AdminUserForm({ editingUser, onSubmit, onClose }: Props) {
  const [form, setForm] = useState<UserAdmin>({
    id: 0,
    fullName: "",
    email: "",
    avatarUrl: "",
    role: "User",
    createdAt: new Date().toISOString(),
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
      setAvatarFile(null);
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      setForm({ ...form, avatarUrl: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = editingUser
      ? { ...form, id: editingUser.id }
      : { ...form, id: Date.now() };
    onSubmit(user);
    onClose();
  };

  return (
    <form className="user-form-pro" onSubmit={handleSubmit}>
      <h3 className="form-title">
        {editingUser ? "✏️ Edit User" : "➕ Add New User"}
      </h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="form-group">
          <label>Avatar</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

      </div>
      {form.avatarUrl && (
                <div className="avatar-preview">
                  <img src={form.avatarUrl} alt="avatar" />
                  <span className="avatar-hover-text">Change</span>
                </div>
       )}
      <div className="form-actions">
        <button type="submit" className="btn btn-save">
          {editingUser ? "Update" : "Add"}
        </button>
        <button type="button" className="btn btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
