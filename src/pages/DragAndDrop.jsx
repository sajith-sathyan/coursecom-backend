import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialVideos = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
  { id: 3, name: "Bob" },
  { id: 4, name: "Emma" },
  { id: 5, name: "Michael" },
];

const SortableVideo = ({ video }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: video.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={video.id}
      className="user"
    >
      {video.name}
    </div>
  );
};

function DragAndDrop() {
  const [videos, setVideos] = useState(initialVideos);
  const [inputValue, setInputValue] = useState("");

  const addVideo = () => {
    const newVideo = {
      id: Date.now().toString(),
      name: inputValue,
    };
    setInputValue("");
    setVideos((videos) => [...videos, newVideo]);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setVideos((videos) => {
      const oldIndex = videos.findIndex((video) => video.id === active.id);
      const newIndex = videos.findIndex((video) => video.id === over.id);
      return arrayMove(videos, oldIndex, newIndex);
    });
  };

  return (
    <div className="container users__container">
      <div>Total: {videos.length}</div>
      <div className="users-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addVideo}>Add Video</button>
      </div>
      <div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={videos}
            strategy={verticalListSortingStrategy}
          >
            {videos.map((video) => (
              <div key={video.id} className="user">
                <SortableVideo key={video.id} video={video} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default DragAndDrop;
