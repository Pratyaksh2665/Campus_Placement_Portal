const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const studentId = req.user.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadySaved = await SavedJob.findOne({
      student: studentId,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      student: studentId,
      job: jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
