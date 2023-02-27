import CreateBlog from "@/app/create/page";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/db";

const fetchBlogs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let page = 1;
    let tag = "";
    let q = "";
    if (req.query.page) page = parseInt(req.query.page as string);
    if (req.query.tag) tag = req.query.tag as string;
    if (req.query.q) q = req.query.q as string;

    let blogs;
    if (tag !== "") {
      blogs = await prisma.$transaction([
        prisma.blog.findMany({
          select: {
            id: true,
            index: true,
            title: true,
            text: true,
            tags: true,
            timestamp: true,
            url: true,
          },
          skip: (page - 1) * 20,
          take: 20,
          orderBy: {
            timestamp: "desc",
          },
          where: {
            tags: {
              has: tag,
            },
          },
        }),
        prisma.blog.count({
          where: {
            tags: {
              has: tag,
            },
          },
        }),
      ]);
    } else if (q !== "") {
      blogs = await prisma.$transaction([
        prisma.blog.findMany({
          select: {
            id: true,
            index: true,
            title: true,
            text: true,
            tags: true,
            timestamp: true,
            url: true,
          },
          where: {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          skip: (page - 1) * 20,
          take: 20,
          orderBy: {
            timestamp: "desc",
          },
        }),
        prisma.blog.count({
          where: {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
        }),
      ]);
    } else {
      blogs = await prisma.$transaction([
        prisma.blog.findMany({
          select: {
            id: true,
            index: true,
            title: true,
            text: true,
            tags: true,
            timestamp: true,
            url: true,
          },
          skip: (page - 1) * 20,
          take: 20,
          orderBy: {
            timestamp: "desc",
          },
        }),
        prisma.blog.count(),
      ]);
    }

    res.status(200).json({
      blogs: blogs[0],
      pages: Math.ceil(blogs[1] / 20),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBlog = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, text, tags, author, authorImage } = req.body;
    const blog = await prisma.blog.create({
      data: {
        index: 1000000 + Math.floor(Math.random() * 1000000),
        title: title,
        text: text,
        tags: tags,
        timestamp: new Date().toISOString(),
        url: "",
        authorImage: authorImage,
        authors: author,
      },
    });
    res.status(200).json(blog);
    // fetch(`${process.env.MODEL_API_ENDPOINT}/new_data_recommender`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     author: blog.authors,
    //     title: blog.title,
    //     content: blog.text,
    //     timestamp: blog.timestamp,
    //     tags: tags,
    //     url: "",
    //     index: blog.index,
    //   }),
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      fetchBlogs(req, res);
      break;
    case "POST":
      createBlog(req, res);
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      res.status(500).json({ message: "Method not allowed" });
      break;
  }
}
