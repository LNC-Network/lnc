"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-12 px-6 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-10">
          Connect with us 🚀
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium">
              Name
            </label>
            <Input type="text" id="name" placeholder="Your Name" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium">
              Email
            </label>
            <Input type="email" id="email" placeholder="Your Email" />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="mb-2 font-medium">
              Message
            </label>
            <Textarea id="message" placeholder="Your Message" rows={4} />
          </div>
          <div className="md:col-span-2 text-center">
            <Button type="submit" className="w-full md:w-auto">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
