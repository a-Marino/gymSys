import { Card, CardHeader, CardContent } from './Card';
import { useState } from 'react';
import { Avatar } from '@nextui-org/react';
import { Space, Calendar, MapPin, Clock } from 'lucide-react';
import { UserAuth } from '../../context/AuthContext';

export const ClassesCard = ({ name, days, address, hour, professor }) => {
  const { userData } = UserAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`w-full min-w-[18rem] transition-all duration-300 cursor-pointer hover:border-primary ${
        isExpanded ? 'min-w-[22rem]' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-md p-3 flex items-center justify-center">
            <Space className="text-black" />
          </div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <div className="flex items-center gap-4">
          <Avatar
            name={professor.name}
            className="h-10 w-10 text-black"
            isBordered
            style={
              professor.avatarColors
                ? {
                    background: `linear-gradient(to right, ${professor.avatarColors[0]}, ${professor.avatarColors[1]})`,
                  }
                : { background: 'gold' }
            }
          />
          <div>
            <p className="text-sm font-medium">{professor.name}</p>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-md p-2 flex items-center justify-center">
              <Calendar className="text-black" />
            </div>
            <div>
              <p className="text-sm font-medium">Class Days</p>
              <div className="flex items-center gap-2 text-sm text-white">
                {days.map((item, index) => (
                  <div className="px-2 py-1 bg-default rounded-md" key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-md p-2 flex items-center justify-center">
              <MapPin className="text-black" />
            </div>
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-md p-2 flex items-center justify-center">
              <Clock className="text-black" />
            </div>
            <div>
              <p className="text-sm font-medium">Class Time</p>
              <p className="text-sm text-muted-foreground">{hour}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
