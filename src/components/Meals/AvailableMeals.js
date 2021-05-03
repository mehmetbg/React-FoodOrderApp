import React, { useEffect,useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
      const fetchMeals = async () => {
        setIsLoading(true);
        const response = await fetch('https://react-foodorderapp-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

        if(!response.ok) {
          throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData){
          loadedMeals.push({
            id:key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      };
        fetchMeals().catch(error => {
        setIsLoading(false);
        setError(error.message);
        });
    }, []);

    let mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);

    if(isLoading){
      mealsList = <section className={classes.MealsLoading}><h1>Loading...</h1></section>
    }
    if(error){
      mealsList = <section className={classes.MealsLoading}><h1>{error}</h1></section>
    }


    return <section className={classes.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>
};

export default AvailableMeals;