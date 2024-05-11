import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter
} from '@material-tailwind/react';
import React, { useState } from 'react';

// Define the interface for a workspace
interface Workspace {
    id: number;
    name: string;
    description: string;
    membersCount: number;
    createdBy: number; // Assuming there's a unique identifier for users
}

// Mock data for workspaces
const initialWorkspaces: Workspace[] = [
    {
        id: 1,
        name: 'Design Team',
        description: 'Workspace for the design team',
        membersCount: 5,
        createdBy: 1
    },
    {
        id: 2,
        name: 'Development Hub',
        description: 'Workspace for developers',
        membersCount: 15,
        createdBy: 2
    },
    {
        id: 3,
        name: 'Marketing Wizards',
        description: 'Marketing strategies discussion',
        membersCount: 8,
        createdBy: 1
    }
];

const currentUserID = 1; // Current user's ID

const WorkspacesPage: React.FC = () => {
    const [workspaces, setWorkspaces] =
        useState<Workspace[]>(initialWorkspaces);
    const [joinedWorkspaces, setJoinedWorkspaces] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to handle joining workspaces
    const handleJoinWorkspace = (workspaceId: number) => {
        setJoinedWorkspaces((prev) => [...prev, workspaceId]);
    };

    const handleUnjoinWorkspace = (workspaceId: number) => {
        setJoinedWorkspaces((prev) => prev.filter((id) => id !== workspaceId));
    };

    const handleDeleteWorkspace = (workspaceId: number) => {
        setWorkspaces((prev) => prev.filter((ws) => ws.id !== workspaceId));
    };

    // Filter workspaces based on search term
    const filteredWorkspaces = workspaces.filter((workspace) =>
        workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">
                Available Workspaces
            </h1>
            <input
                type="text"
                placeholder="Search workspaces..."
                className="mb-4 p-2 w-full border rounded shadow"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mb-4">
                <Button color="blue" onClick={() => setIsModalOpen(true)}>
                    Create New Workspace
                </Button>
                <Dialog
                    open={isModalOpen}
                    handler={() => setIsModalOpen(false)}
                >
                    <DialogBody>
                        <input
                            type="text"
                            placeholder="Workspace name"
                            className="p-2 border rounded shadow w-full"
                            value={newWorkspaceName}
                            onChange={(e) =>
                                setNewWorkspaceName(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="p-2 border rounded shadow w-full mt-2"
                            value={newWorkspaceDescription}
                            onChange={(e) =>
                                setNewWorkspaceDescription(e.target.value)
                            }
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            color="red"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="green"
                            onClick={() => {
                                const newWorkspace: Workspace = {
                                    id:
                                        Math.max(
                                            ...workspaces.map((ws) => ws.id)
                                        ) + 1,
                                    name: newWorkspaceName,
                                    description: newWorkspaceDescription,
                                    membersCount: 1,
                                    createdBy: currentUserID
                                };
                                setWorkspaces((prev) => [
                                    ...prev,
                                    newWorkspace
                                ]);
                                setIsModalOpen(false);
                            }}
                        >
                            Create Workspace
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWorkspaces.map((workspace) => (
                    <div
                        key={workspace.id}
                        className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <h3 className="text-xl font-semibold">
                            {workspace.name}
                        </h3>
                        <p className="text-gray-600">{workspace.description}</p>
                        <p className="text-gray-500">
                            Members: {workspace.membersCount}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    handleUnjoinWorkspace(workspace.id)
                                }
                                className={`mt-2 w-full py-2 px-4 rounded text-white font-bold ${
                                    joinedWorkspaces.includes(workspace.id)
                                        ? 'bg-orange-500 hover:bg-orange-600'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                                disabled={
                                    !joinedWorkspaces.includes(workspace.id)
                                }
                            >
                                Unjoin
                            </button>
                            <button
                                onClick={() =>
                                    handleJoinWorkspace(workspace.id)
                                }
                                className={`mt-2 w-full py-2 px-4 rounded text-white font-bold ${
                                    joinedWorkspaces.includes(workspace.id)
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                                disabled={joinedWorkspaces.includes(
                                    workspace.id
                                )}
                            >
                                Join
                            </button>
                            {workspace.createdBy === currentUserID && (
                                <>
                                    <button
                                        onClick={() =>
                                            handleDeleteWorkspace(workspace.id)
                                        }
                                        className="mt-2 w-full py-2 px-4 rounded text-white font-bold bg-red-500 hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteWorkspace(workspace.id)
                                        }
                                        className="mt-2 w-full py-2 px-4 rounded text-white font-bold bg-yellow-500 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkspacesPage;
