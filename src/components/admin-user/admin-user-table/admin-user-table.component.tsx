import type { UserAdmin } from "../../../types/admin-user.interface";
import "./admin-user-table.scss";

interface Props {
  users: UserAdmin[];
  onEdit: (user: UserAdmin) => void;
  onDelete: (id: number) => void;
}

export default function AdminUserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              {u.avatarUrl ? (
                <img src={u.avatarUrl} alt={u.fullName} className="avatar" />
              ) : (
                "N/A"
              )}
            </td>
            <td>{u.fullName}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            <td>
              <button className="btn edit" onClick={() => onEdit(u)}>
                Edit
              </button>
              <button className="btn delete" onClick={() => onDelete(u.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
