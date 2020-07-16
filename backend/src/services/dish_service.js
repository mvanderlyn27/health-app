const Dish = require("../models/dish");
const InputValidator = require('./input_validator');
const {DatabaseError, NotFoundError, AlreadyExistingError} = require ('../middleware/errorHandling');
const User = require("../models/user");
const key = 'health is a gift';
class DishService{
    //creates new dish with info
    static async create_dish(dish_info){
        InputValidator.validateDishInfo(dish_info);
        let dish = await Dish.create(dish_info);
        if(!dish){
            throw new AlreadyExistingError('Dish already exists');
        }
        return dish;
    }
    //finds dish via search_string
    static async search_dishes(search_string){
        let dishes = await Dish.findAll({
            where: {
                name: { [Op.substring]: search_string }
            }
        });
        if(!dishes){
            throw new NotFoundError('No dishes found');
        }
        return dishes;
    }
    //takes array of id's, for 1 just put one id
    static async find_dishes(ids){
        let dishes = await Dish.findAll({
            where: {
                id: {[Op.in]: ids}
            }
        });
        if(!dishes){
            throw new NotFoundError('No dishes found');
        }
        return dishes;
    }
    //takes array of dishes
    static async delete_dishes(ids){
        try{
            await Dish.destroy({
                where: {
                    id: {[Op.in]: ids}
                }
            });
            return true;
        }catch(e){
            throw new DatabaseError("Couldn't delete dishes, please check ids and try again");
        }
    }
    //update object return true on success
    //json of field: new value
    static async update_dish(dish_ids, update_info){
        InputValidator.validateDishUpdate(update_info);
        try{
           let dishes = await Dish.update({update_info},{
                where: {id: dish_id},
                returning:true,
                plain:true
            });
            if(dishes[0] == 0){
                throw new NotFoundError("No dishes found with those ID's");
            }
            return dishes[1];
        }catch(e){
            console.log(e);
            throw new DatabaseError("Couldn't update dish, please check ids/update data and try again");
        }
    }static async list_dishes(){
        try{
           let dishes = await Dish.findAll();
            return dishes;
        }catch(e){
            console.log(e);
            throw new DatabaseError("Error loading dishes, please check try again");
        }
    }
}
module.exports = DishService;