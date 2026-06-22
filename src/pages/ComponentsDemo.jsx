import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  Loader,
  Toast,
} from "../components/ui";

function ComponentsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-4xl font-bold">
        Component Library
      </h1>

      <div className="space-x-3">
        <Button variant="primary">
          Primary Button
        </Button>

        <Button variant="secondary">
          Secondary Button
        </Button>

        <Button variant="outline">
          Outline Button
        </Button>
      </div>

      <Input
        label="Email"
        placeholder="Enter email"
      />

      <Button
        variant="primary"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Demo Modal"
      >
        <p>
          This is a Modal Component Demo.
        </p>
      </Modal>

      <Loader />

      <Toast message="Success!" />

    </div>
  );
}

export default ComponentsDemo;