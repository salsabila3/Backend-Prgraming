// Import Model Patient
const Patient = require("../models/Patient");

// Membuat class PatientController
class PatientController {
  // Membuat method index
    async index(req, res) {
        // Mendapatkan semua data pasien
        const patients = await Patient.all();

        // Menampilkan semua data pasien
        if (patients.length > 0) {
            const data = {
                message: "Get all resource",
                data: patients,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Data is empty",
            };
            res.status(404).json(data);
        }
    };

    // Membuat method store
    async store(req, res) {
        // Menyimpan data pasien
        const { name, phone, address, status } = req.body;

        // Membuat validasi
        // - Handle jika data tidak lengkap
        if (!name || !phone || !address || !status) {
            const data = {
                message: "All field must be filled correctly",
            };
            return res.status(422).json(data);
        }

        // Else
        const patient = await Patient.create(req.body);
        const data = {
            message: "Resource is added successfully",
            data: patient,
        };
        return res.status(201).json(data);
    };

    // Membuat method update
    async update(req, res) {
        const { id } = req.params;
        // Mencari data berdasarkan id
        const patient = await Patient.find(id);

        // Memperbarui data
        if (!patient) {
            const data = {
                message: "Resource not found",
            };
            return res.status(404).json(data);
        }
        const updatedPatient = await Patient.update(id, req.body);
        const data = {
            message: "Resource is updated successfully",
            data: updatedPatient,
        };
        return res.status(200).json(data);
    };

    // Membuat method destroy
    async destroy(req, res) {
        const { id } = req.params;
        // Mencari data berdasarkan id
        const patient = await Patient.find(id);

        // Menghapus data
        if (!patient) {
            const data = {
                message: "Resource not found",
            };
            return res.status(404).json(data);
        }
        await Patient.delete(id);
        const data = {
            message: "Resource is deleted successfully",
        };
        return res.status(200).json(data);
    };

    // Membuat method show
    async show(req, res) {
        const { id } = req.params;
        // Mencari data berdasarkan id
        const patient = await Patient.find(id);

        // Menampilkan data
        if (patient) {
            const data = {
                message: "Get detailed resource",
                data: patient,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    }

    // Membuat method search
    async search(req, res) {
        const { name } = req.query;
        // Mencari data berdasarkan nama
        const patients = await Patient.search(name);

        // Menampilkan data
        if (patients.length > 0) {
            const data = {
                message: "Get searched resource",
                data: patients,
            };
            res.status(200).json(data);
        } else {
            const data = {
                message: "Resource not found",
            };
            res.status(404).json(data);
        }
    };

    // Membuat method positive
    async positive(req, res) {
        // Mencari data berdasarkan status
        const patients = await Patient.findByStatus("positive");

        // Menampilkan data
        const data = {
            message: "Get positive resource",
            total: patients.length,
            data: patients,
        };
        res.status(200).json(data);
    };

    // Membuat method recovered
    async recovered(req, res) {
        // Mencari data berdasarkan status
        const patients = await Patient.findByStatus("recovered");

        // Menampilkan data
        const data = {
            message: "Get recovered resource",
            total: patients.length,
            data: patients,
        };
        res.status(200).json(data);
    };

    // Membuat method dead
    async dead(req, res) {
        // Mencari data berdasarkan status
        const patients = await Patient.findByStatus("dead");

        // Menampilkan data
        const data = {
            message: "Get dead resource",
            total: patients.length,
            data: patients,
        };
        res.status(200).json(data);
    };
}

// Membuat objek class PatientController
const object = new PatientController();

// export class PatientController
module.exports = object;