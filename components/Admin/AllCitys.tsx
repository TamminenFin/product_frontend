"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useCreateCity,
  useGetAllCity,
  useRemoveCity,
  useUpdateCity,
} from "@/hooks/city.hooks";
import { toast } from "sonner";

interface City {
  _id: string;
  name: string;
}

export default function AllCitys() {
  const { data, refetch, isLoading } = useGetAllCity();
  const { mutate: addNewCity, isPending: isCreatingPanding } = useCreateCity();
  const { mutate: removeCity, isPending: isRemovePanding } = useRemoveCity();
  const { mutate: updateACity, isPending: isUpdatePanding } = useUpdateCity();

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const handleEdit = (id: string, name: string) => {
    setSelectedCity({ _id: id, name });
    setNewName(name);
    setEditOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    setSelectedCity({ _id: id, name });
    setDeleteOpen(true);
  };

  const handleAdd = () => {
    setNewName("");
    setAddOpen(true);
  };

  const updateCity = () => {
    if (selectedCity) {
      updateACity(
        { id: selectedCity._id, payload: { name: newName } },
        {
          onSuccess: (data) => {
            if (data?.success) {
              toast.success(data.message);
              setEditOpen(false);
              refetch();
            } else {
              toast.error(data.message);
            }
          },
        }
      );
    }
  };

  const confirmDelete = () => {
    if (selectedCity) {
      removeCity(selectedCity._id, {
        onSuccess: (data) => {
          if (data?.success) {
            toast.success(data.message);
            setDeleteOpen(false);
            refetch();
          } else {
            toast.error(data.message);
          }
        },
      });
    }
  };

  const addCity = () => {
    if (newName.trim()) {
      addNewCity(
        { name: newName },
        {
          onSuccess: (data) => {
            if (data?.success) {
              toast.success(data.message);
              setAddOpen(false);
              refetch();
            } else {
              toast.error(data.message);
            }
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cities</h1>
          <div className="w-24 h-10 bg-gray-300 rounded-md animate-pulse" />
        </div>

        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="p-4 bg-gray-200 rounded-md flex justify-between items-center"
            >
              <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-300 rounded-md animate-pulse" />
                <div className="h-8 w-8 bg-gray-300 rounded-md animate-pulse" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cities</h1>
        <Button onClick={handleAdd}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add City
        </Button>
      </div>

      <ul className="space-y-3">
        {data?.data?.map((city: City) => (
          <li
            key={city._id}
            className={cn(
              "flex justify-between items-center bg-gray-200 p-4 rounded-md transition hover:bg-gray-300"
            )}
          >
            <span className="font-medium">{city.name}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleEdit(city._id, city.name)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(city._id, city.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add City Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <h2 className="text-xl font-semibold">Add New City</h2>
          <Input
            placeholder="Enter city name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              disabled={isCreatingPanding}
              variant="outline"
              onClick={() => setAddOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={addCity} disabled={!newName.trim()}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit City Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <h2 className="text-xl font-semibold">Edit City</h2>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              disabled={isUpdatePanding}
              variant="outline"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={updateCity}
              disabled={!newName.trim() || isUpdatePanding}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <h2 className="text-xl font-semibold text-red-600">Delete City</h2>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedCity?.name}</strong>?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              disabled={isRemovePanding}
              variant="outline"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isRemovePanding}
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
