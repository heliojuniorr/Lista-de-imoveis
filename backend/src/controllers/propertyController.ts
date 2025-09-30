import type { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

interface PropertyBody {
  title: string;
  address: string;
  status: "active" | "inactive";
}

const createProperty = async (req: Request<{}, {}, PropertyBody>, res: Response) => {
  try {
    const { title, address, status } = req.body;

    if (!title || !address || !status) {
      return res.status(400).json({ error: "Title, address and status are required." });
    }

    const newProperty = await prisma.property.create({
      data: { title, address, status },
    });

    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ error: "Error, it was not possible to create a property." });
  }
};

const listProperties = async (req: Request, res: Response) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
};

const getProperty = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  const id = parseInt(req.params.id);
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    return res.status(404).json({ error: "Property not found." });
  }

  res.json(property);
};

const updateProperty = async (req: Request<{ id: string }, {}, PropertyBody>, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, address, status } = req.body;

  if (!title || !address || !status) {
    return res.status(400).json({ error: "Title, address and status are required." });
  }

  try {
    const updated = await prisma.property.update({
      where: { id },
      data: { title, address, status },
    });

    res.json(updated);
  } catch {
    res.status(404).json({ error: "Property not found." });
  }
};

const deleteProperty = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const deleted = await prisma.property.delete({ where: { id } });
    res.json(deleted);
  } catch {
    res.status(404).json({ error: "Property not found." });
  }
};

module.exports = { createProperty, listProperties, getProperty, updateProperty, deleteProperty }
