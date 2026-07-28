import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full p-8 text-black dark:text-white">

        <h1 className="text-4xl font-bold mb-8">
          Component Library
        </h1>

        <div className="space-x-3 mb-8">

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

        <div className="mb-8">

          <Input
            label="Email"
            placeholder="Enter email"
          />

        </div>

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
          <p className="text-gray-700 dark:text-gray-300">
            This is a Modal Component Demo.
          </p>
        </Modal>

        <div className="my-8">
          <Loader />
        </div>

        <Toast message="Success!" />

      </main>

      <Footer />

    </div>
  );
}

export default ComponentsDemo;