import { useState } from "react";
import type { UserAdmin } from "../../../types/admin-user.interface";
import AdminUserTable from "../../../components/admin-user/admin-user-table/admin-user-table.component";
import AdminUserForm from "../../../components/admin-user/admin-user-form/admin-user-form.component";
import Modal from "../../../components/common/modal.component";
import "./admin-users.page.scss";

const fakeUsers: UserAdmin[] = [
  {
    id: 1,
    fullName: "Tony Stark",
    email: "tony@stark.com",
    avatarUrl: "https://i.pravatar.cc/100?img=1",
    role: "Admin",
    createdAt: "2023-01-10",
  },
  {
    id: 2,
    fullName: "Bruce Wayne",
    email: "bruce@wayne.com",
    avatarUrl: "https://i.pravatar.cc/100?img=2",
    role: "User",
    createdAt: "2023-02-15",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserAdmin[]>(fakeUsers);
  const [editingUser, setEditingUser] = useState<UserAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOrUpdate = (user: UserAdmin) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  const handleEdit = (user: UserAdmin) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
      <div className="users-page">
        <h1>👥 Admin User Management</h1>
        <button
          className="btn add"
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
        >
          ➕ Add User
        </button>

        <AdminUserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AdminUserForm
            editingUser={editingUser}
            onSubmit={handleAddOrUpdate}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
  );
}
