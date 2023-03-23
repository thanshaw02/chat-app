import express from "express";

const router = express.Router();

router.get("/:age/hello", async (req: express.Request, res: express.Response) => {
  const age = req.params.age;

  console.log(`Path param "age": ${age}`);

  return res.status(200).send("<p>Hello?</p>\n");
});

export default router;
