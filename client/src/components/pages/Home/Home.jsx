import { Button, Link } from '@nextui-org/react';
import { Dumbbell, HeartPulse, Calendar } from 'lucide-react';

export const Home = function () {
  return (
    <div className="flex flex-col min-h-[92vh]">
      <section className="flex flex-col items-center justify-center gap-10 w-full py-32">
        <h1 className="text-8xl font-semibold text-center">Unlock Your Fitness Potential</h1>
        <p className="text-2xl w-[80%] text-center font-light">
          Experience the best gym in town with state-of-the-art equipment, expert trainers, and a
          welcoming community.
        </p>
        <div className="flex gap-5">
          <Button size="lg" color="primary" variant="ghost" as={Link} href="/login">
            Join Now
          </Button>
        </div>
      </section>
      <section className="flex justify-between gap-10 px-10 py-32 bg-content2">
        <div className="flex flex-col gap-2 w-[30rem]">
          <Dumbbell size={52} />
          <h3 className="text-2xl font-bold">State-of-the-Art Equipment</h3>
          <p className="text-lg">
            Our gym is equipped with the latest and greatest fitness equipment to help you reach
            your goals.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-[30rem]">
          <HeartPulse size={52} />
          <h3 className="text-2xl font-bold">Expert Trainers</h3>
          <p className="text-lg">
            Our team of certified trainers are here to guide you every step of the way and help you
            achieve your fitness objectives.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-[30rem]">
          <Calendar size={52} />
          <h3 className="text-2xl font-bold">Diverse Class Schedules</h3>
          <p className="text-lg">
            From high-intensity interval training to relaxing yoga sessions, we offer a wide range
            of classes to suit all fitness levels and preferences.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-10 w-full py-32">
        <h1 className="text-5xl font-semibold">Join Our Fitness Community</h1>
        <p className="text-2xl w-[80%] text-center font-light">
          Experience the best gym in town with state-of-the-art equipment, expert trainers, and a
          welcoming community.
        </p>
        <div className="flex gap-5">
          <Button size="lg" color="primary" variant="ghost" as={Link} href="/login">
            Join Now
          </Button>
          <Button size="lg" color="primary" variant="flat" as={Link} href="/classes">
            Classes
          </Button>
        </div>
      </section>
    </div>
  );
};
