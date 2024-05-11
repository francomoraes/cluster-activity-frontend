import React, { useState } from 'react';
import {
    Button,
    Input,
    Dialog,
    DialogBody,
    DialogFooter
} from '@material-tailwind/react';

interface Workspace {
    id: number;
    name: string;
    description: string;
    membersCount: number;
    createdBy: number; // Assuming there's a unique identifier for users
}

interface CreateWorkspaceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    workspaces: Workspace[];
    setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
    newWorkspaceName: string;
    setWorkspaceName: React.Dispatch<React.SetStateAction<string>>;
    newWorkspaceDescription: string;
    setWorkspaceDescription: React.Dispatch<React.SetStateAction<string>>;
    currentUserID: number;
}

export const CreateWorkspaceDialog: React.FC<CreateWorkspaceDialogProps> = ({
    isOpen,
    onClose,
    workspaces,
    setWorkspaces,
    newWorkspaceName,
    setWorkspaceName,
    newWorkspaceDescription,
    setWorkspaceDescription,
    currentUserID
}) => {
    const handleCreateWorkspace = () => {
        const newWorkspace: Workspace = {
            id: Math.max(...workspaces.map((ws) => ws.id)) + 1,
            name: newWorkspaceName,
            description: newWorkspaceDescription,
            membersCount: 1,
            createdBy: currentUserID
        };
        setWorkspaces((prev) => [...prev, newWorkspace]);
        console.log('workspaces', workspaces);
    };
    console.log('workspaces', workspaces);

    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogBody>
                <Input
                    type="text"
                    placeholder="Workspace Name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Description"
                    className="mt-2"
                    value={workspaceDescription}
                    onChange={(e) => setWorkspaceDescription(e.target.value)}
                />
            </DialogBody>
            <DialogFooter>
                <Button color="red" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="green" onClick={handleCreateWorkspace}>
                    Create Workspace
                </Button>
            </DialogFooter>
        </Dialog>
    );
};
