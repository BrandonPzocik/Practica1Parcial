import { createJwt } from "../helpers/createJwt.js";
import {
  createUser,
  getUserByCredentials,
  usersCollection,
} from "../models/user.model.js";

export const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createJwt(user.id);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUpCtrl = async (req, res) => {
  try {
    // ! Completar la función signUpCtrl
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    const userExits = usersCollection.find((user) => user.email === email);

    if (userExits) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const newUser = await createUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOutCtrl = (_req, res) => {
  try {
    // ! Completar la función signOutCtrl
    res.clearCookie("token");

    res.status(200).json({ message: "cerrado de session exitoso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
