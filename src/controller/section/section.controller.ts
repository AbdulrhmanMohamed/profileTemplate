import { Request, Response } from "express";
import Section, { ISection } from "../../model/section.model";
import mongoose from "mongoose";
import Page, { IPage } from "../../model/page.model";
import { AuthenticatedRequest } from "../../middlewares/auth";

// DESC add Section
// Route : POST /profile/api/v1/Section
export const addSection = async (req: Request, res: Response) => {
  // cehck if Section exist or not
  const section = await Section.findOne({ ...req.body });
  if (!section)
    return res
      .status(400)
      .send({ success: false, message_en: "Section Not Found" });
  const newSection = new Section({ ...req.body });
  res.status(200).send({
    success: true,
    messag_en: "Section Fetched Successfully",
    newSection,
  });
};

export const addSectionToSpecificPage = async (req: AuthenticatedRequest, res: Response) => {
  console.log('calling specific')
  console.log(req.params.pageId)
  const { pageId } = req.params;
  const page = await Page.findById(pageId)
  // create the section inside the page 
  const section = new Section({ ...req.body })
  await section.save();
  await page?.update({ $push: { sections: section._id } })
  if (!page)
    return res.status(400).send({ success: false, message_en: 'Page Not Found' })
  res.status(200).send({ success: true, message_en: 'Section Add To The page Successfully' })
}

export const relateSection = async (req: AuthenticatedRequest, res: Response) => {
  const { pageId, sectionId } = req.params;
  const page = await Page.updateOne({ _id: pageId }, {
    $push: { sections: sectionId }
  })
  if (!page)
    return res.status(400).send({ success: false, message_en: 'Cant Relate To the page since its not found' })
  res.status(200).send({ success: true, message_en: 'section Refrenced to the desired Page successfully' })
}

//DESC get Section by id
//Route GET /profile/api/v1/Section/:id
export const getSection = async (req: Request, res: Response) => {
  const id = req.params.id;
  const section = await Section.findById(id);
  if (!section)
    return res
      .status(400)
      .send({ success: false, message_en: "Section Not Found" });
  res.status(200).send({
    success: true,
    messag_en: "Section Fetched Successfully",
    section,
  });
};

//DESC get All Sections
//Route GET /profile/api/v1/section
export const getAllSections = async (req: Request, res: Response) => {
  const sections = await Section.find({});
  if (sections.length == 0)
    return res
      .status(400)
      .send({ success: false, message_en: "Sections Not Found" });
  res.status(200).send({
    success: true,
    messag_en: "Section Fetched Successfully",
    sections: { count: sections.length, sections },
  });
};

//DESC updateSection
//Route PUT /profile/api/v1/Section/:id

export const updateSection = async (req: Request, res: Response) => {
  const id = req.params.id;
  const section = await Section.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  if (!section)
    return res
      .status(400)
      .send({ success: false, message_en: "Section not Found" });
  res.status(200).send({
    success: true,
    message_en: "Section Updated Successfully",
    section,
  });
};

export const updateSectionState = async (req: AuthenticatedRequest, res: Response) => {
  const section = await Section.updateOne({ _id: req.params.id }, {
    $set: { isActive: true }
  })
  if (!section) {
    return res.status(400).send({ success: false, message_en: 'Cant update section State , Section not Found' })
  }
  res.status(200).send({ success: true, message_en: 'updates Section State Successfully' })
}
export const deleteSection = async (req: Request, res: Response) => {
  const pages: Array<IPage> = await Page.find({
    sections: {
      $elemMatch: { $eq: req.params.id },
    },
  });
  pages.map(async (page: IPage) => {
    await Page.updateMany(
      { _id: page._id },
      {
        $pull: {
          sections: req.params.id,
        },
      }
    );
  });
  //   await Section.deleteOne({_id:})
  res.status(200).send(pages);
};
