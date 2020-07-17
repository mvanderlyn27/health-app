const Goal = require("../models/goal");
const InputValidator = require('./input_validator');
const {UserValidationError, DatabaseError, NotFoundError, UserExistingError} = require ('../middleware/errorHandling');
class GoalService{
    static async create_goal(goal_info){
        InputValidator.validateGoalCreation(goal_info);        
        let goal = await Goal.create(goal_info);
        if(!goal){
            throw new AlreadyExistingError("Exercise already exists"); 
        }
        return goal;
    }
    static async find_goals(ids){
        let goals = await Goals.findAll({where:{id:{[Op.in]:ids}}});
        if(!goals){
            throw new NotFoundError("No goals found with those ids");
        }
        return goals;
    } 
    //searching of exercises filterable on body_parts
    static async search_goals(name){
        //not sure if this works, second condition needs to be true always
        let goals = await Goals.findAll({ where: { [Op.substring]: name } });
        if(!goals){
            throw new NotFoundError("No exercises found with the search querry")
        }
        return goals;
    } 
    static async update_goals(ids, update_info){
        InputValidator.validateGoalUpdate(update_info);
        try{
           let goals = await Goals.update({update_info},{
                where: {id: ids},
                returning:true,
                plain:true
            });
            if(goals[0] == 0){
                throw new NotFoundError("No goals found with those ID's");
            }
            return goals[1];
        }catch(e){
            console.log(e);
            throw new DatabaseError("Couldn't update goal, please check ids/update data and try again");
        } 
    } 
    static async delete_goals(ids){
        try{
            let output = await Goals.delete({
                where: {id: ids},
                returning:true,
                plain:true
            });
            if(output[0] == 0){
                throw new NotFoundError("No goals found with those ID's");
            }
            return true;
        }catch(e){
            console.log(e);
            throw new DatabaseError("Couldn't delete goals, please check ids and try again");
        }
    } 
    static async list_goals(){
        let goals = await Goals.findAll();
        if (!goals){
            throw new NotFoundError("No goals found");
        }
        return goals; 
    } 
}
module.exports = GoalService;