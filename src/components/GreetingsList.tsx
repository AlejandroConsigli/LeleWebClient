import { ChangeEvent, useState } from "react";
import "./Greetings.scss";
import {
  useGetGreetingsQuery,
  useCreateGreetingMutation,
  useUpdateGreetingMutation,
  useDeleteGreetingMutation,
  Greeting,
} from "../api/apiSlice";
import { ReactComponent as UpdateSvg } from "../assets/icons/pencil.svg";
import { ReactComponent as DeleteSvg } from "../assets/icons/trash.svg";
import { ReactComponent as CreateSvg } from "../assets/icons/plus.svg";
import { BallTriangle } from "react-loader-spinner";
import variables from "../index.scss";

const GreetingsList = () => {
  const { data, isLoading: isLoadingGet } = useGetGreetingsQuery(undefined);
  const [createGreeting, { isLoading: isLoadingCreate }] =
    useCreateGreetingMutation();
  const [updateGreeting, { isLoading: isLoadingUpdate }] =
    useUpdateGreetingMutation();
  const [deleteGreeting, { isLoading: isLoadingDelete }] =
    useDeleteGreetingMutation();

  const defaultGreeting: Greeting = {
    name: "",
    description: "",
  };

  const [updating, setUpdating] = useState(false);
  const [greeting, setGreeting] = useState(defaultGreeting);

  const handleCreate = () => {
    if (greeting.name && greeting.description) {
      createGreeting(greeting);
      setGreeting(defaultGreeting);
    }
  };
  const setUpdate = (greeting: Greeting) => {
    setGreeting(greeting);
    setUpdating(true);
  };
  const handleUpdate = () => {
    updateGreeting(greeting);
    setGreeting(defaultGreeting);
    setUpdating(false);
  };
  const handleDelete = (greeting: Greeting) => {
    deleteGreeting(greeting);
    setGreeting(defaultGreeting);
  };

  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGreeting({
      ...greeting,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="greetings">
      {isLoadingGet || isLoadingCreate || isLoadingUpdate || isLoadingDelete ? (
        <BallTriangle
          height="50"
          width="50"
          ariaLabel="loading"
          wrapperClass="loader"
          color={variables.lightMainColor}
        />
      ) : (
        <div className="data">
          {data?.map((greeting) => (
            <span className="list" key={greeting._id}>
              {`${greeting.name}: ${greeting.description}`}
              <UpdateSvg
                className="update"
                onClick={() => setUpdate(greeting)}
              />
              <DeleteSvg
                className="delete"
                onClick={() => handleDelete(greeting)}
              />
            </span>
          ))}
          <div className="form">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={greeting.name}
              onChange={handleFromChange}
              className="name"
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={greeting.description}
              onChange={handleFromChange}
              className="description"
            />
            {updating ? (
              <UpdateSvg className="update" onClick={handleUpdate} />
            ) : (
              <CreateSvg className="create" onClick={handleCreate} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GreetingsList;
