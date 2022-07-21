export default {
  getIndex: (req: any, res: any) => {
    return res.status(200).json({
      message: "hello world",
    });
  },
};
