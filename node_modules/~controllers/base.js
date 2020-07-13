import mongoose from "mongoose";
import * as _ from "lodash";
import { ErrorHandler } from "@utils/handleError";

function getAll(ModelTarget) {
  return async (req, res) => {
    try {
      const data = await ModelTarget.findAll();
      handleResponse(req, res, data);
    } catch (err) {
      throw new ErrorHandler(500, `không thể get dữ liệu message:${err.name}`);
    }
  };
}

function getById(ModelTarget) {
  return async (req, res) => {
    try {
      const data = await ModelTarget.findOne({ where: { id: req.params.id } });
      handleResponse(req, res, data);
    } catch (err) {
      throw new ErrorHandler(500, `không thể get dữ liệu message:${err.name}`);
    }
  };
}

function post(ModelTarget) {
  return async (req, res) => {
    try {
      const data = await ModelTarget.create(req.body, { returning: true });
      handleResponse(req, res, data);
    } catch (err) {
      throw new ErrorHandler(500, `không thể tạo entity message:${err.name}`);
    }
  };
}

function deleteById(ModelTarget) {
  return async (req, res) => {
    try {
      const _id = req.params.id;
      const result = ModelTarget.destroy({ where: { id: _id } });
      handleResponse(req, res, data);
    } catch (err) {
      throw new ErrorHandler(
        500,
        `không thể delete entity message:${err.name}`
      );
    }
  };
}

function updateById(ModelTarget) {
  return async (req, res) => {
    try {
      const _id = req.params.id;
      const result = await ModelTarget.update(req.body, {
        where: { id: _id },
      });
      handleResponse(req, res, result);
    } catch (err) {
      throw new ErrorHandler(
        500,
        `không thể update entity message:${err.name}`
      );
    }
  };
}

export const base = {
  getAll,
  getById,
  post,
  deleteById,
  updateById,
};
