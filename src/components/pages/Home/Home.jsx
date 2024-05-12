import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';

export const Home = function () {
  return (
    <div className="flex flex-col px-5 mb-5">
      <p className="mt-5 opacity-70 z-[-1]">The best fitnes club in the town</p>
      <div className="flex flex-col md:flex-row">
        <h1 className="text-5xl font-semibold  leading-relaxed">
          IMPROVE YOUR <br />
          FITNESS LEVEL FOR <br />
          THE BETTER
        </h1>
        <div className="md:self-end md:ml-52  mt-5 md:mt-0">
          <Link to="/register">
            <Button className="text-xl">BE A MEMBER</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 mt-5 justify-around">
        <div className="flex md:flex-col gap-5">
          <img
            src="https://t2.uc.ltmcdn.com/es/posts/1/0/4/que_es_el_fitness_y_sus_beneficios_52401_orig.jpg"
            className="w-[60%] h-[60%] lg:w-full lg:h-full rounded-2xl object-cover"
          />
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate neque
            animi corrupti facere ut qui cupiditate voluptatibus, mollitia, quaerat dignissimos
            magnam sunt placeat.
          </p>
        </div>
        <img
          src="https://media.gq.com.mx/photos/625db17471f363f634bce022/master/pass/ejercicio-1388957838.jpg"
          className="lg:w-[60%] rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};
