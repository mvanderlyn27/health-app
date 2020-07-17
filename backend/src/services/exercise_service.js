
const Exercise = require("../models/exercise");
const InputValidator = require('./input_validator');
const {UserValidationError, DatabaseError, NotFoundError, AlreadyExistingError} = require ('../middleware/errorHandling');
class ExerciseService{
    static async create_exercise(exercise_info){
        InputValidator.validateExerciseCreation(exercise_info);        
        let exercise = await Exercise.create(exercise_info);
        if(!exercise){
            throw new AlreadyExistingError("Exercise already exists"); 
        }
        return exercise;
    }
    static async find_exercises(ids){
        let exercises = await Exercise.findAll({where:{id:{[Op.in]:ids}}});
        if(!exercises){
            throw new NotFoundError("No exercises found with those ids");
        }
        return exercises;
    } 
    //searching of exercises filterable on body_parts
    static async search_exercises(name, body_parts){
        //not sure if this works, second condition needs to be true always
        InputValidator.validateExerciseSearch(body_parts);
        let filter = body_parts.length>0 ? {body_part_worked:{[Op.in]:body_parts}}:{};
        let exercises = await Exercise.findAll({
            where: {
                [Op.and]: [
                    {[Op.substring]: name},
                    filter
                ]
            } 
        });
        if(!exercises){
            throw new NotFoundError("No exercises found with the search querry")
        }
        return exercises;
    } 
    static async update_exercises(ids, update_info){
        InputValidator.validateExerciseUpdate(update_info);
        try{
           let exercises = await Exercise.update({update_info},{
                where: {id: ids},
                returning:true,
                plain:true
            });
            if(exercises[0] == 0){
                throw new NotFoundError("No exercises found with those ID's");
            }
            return exercises[1];
        }catch(e){
            console.log(e);
            throw new DatabaseError("Couldn't update exercise, please check ids/update data and try again");
        } 
    } 
    static async delete_exercises(ids){
        try{
            let output = await Exercise.delete({
                where: {id: ids},
                returning:true,
                plain:true
            });
            if(output[0] == 0){
                throw new NotFoundError("No exercises found with those ID's");
            }
            return true;
        }catch(e){
            console.log(e);
            throw new DatabaseError("Couldn't delete exercise, please check ids and try again");
        }
    } 
    static async list_exercise(){
        let exercises = await Exercise.findAll();
        if (!exercises){
            throw new NotFoundError("No exercises found");
        }
        return exercises; 
    } 
}
module.exports = ExerciseService;