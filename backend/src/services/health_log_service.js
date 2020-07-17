const HealthLog = require("../models/health_log");
const jwt = require("jsonwebtoken");
const InputValidator = require('./input_validator');
const { UserValidationError, DatabaseError, NotFoundError, UserExistingError } = require('../middleware/errorHandling');
const key = 'health is a gift';
class HealthLogService {
    static async create_entry(entry_info) {
        //InputValidator.validateEntryCreation(entry_info);
        let entry = await HealthLog.create(entry_info);
        if (!entry) {
            this.update_entries
            throw new AlreadyExistingError("Entry already exists");
        }
        return entry;
    }
    static async find_entries(ids) {
        let entries = await HealthLog.findAll({ where: { id: { [Op.in]: ids } } });
        if (!entries) {
            throw new NotFoundError("No exntry found with those ids");
        }
        return entries;
    }
    static async update_entries(ids, update_info) {
        //InputValidator.validateEntryUpdate(update_info);
        try {
            let entries = await HealthLog.update({ update_info }, {
                where: { id: ids },
                returning: true,
                plain: true
            });
            if (entries[0] == 0) {
                throw new NotFoundError("No entry found with those ID's");
            }
            return entries[1];
        } catch (e) {
            console.log(e);
            throw new DatabaseError("Couldn't update entry, please check ids/update data and try again");
        }
    }
    static async delete_entries(ids) {
        try {
            let output = await HealthLog.delete({
                where: { id: ids },
                returning: true,
                plain: true
            });
            if (output[0] == 0) {
                throw new NotFoundError("No entries found with those ID's");
            }
            return true;
        } catch (e) {
            console.log(e);
            throw new DatabaseError("Couldn't delete entries, please check ids and try again");
        }
    }
    static async list_entries() {
        let entries = await HealthLog.findAll();
        if (!entries) {
            throw new NotFoundError("No entries found");
        }
        return entries;
    }
}
module.exports = HealthLogService;