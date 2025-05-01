import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import { checkFavourites, updateFavourites } from "../utils/common";
import { toFav } from "../utils/api";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetail: { favourites, token },
    setUserDetail,
  } = useContext(UserDetailContext);

  useEffect(() => {
    setHeartColor(checkFavourites(id, favourites));
  }, [favourites, id]);

  const { mutate } = useMutation(() => toFav(id, user?.email, token), {
    onSuccess: () => {
      setUserDetail((prev) => {
        const updated = updateFavourites(id, prev.favourites);
        const newDetail = { ...prev, favourites: updated };
        localStorage.setItem("userDetail", JSON.stringify(newDetail)); // sync localStorage
        return newDetail;
      });
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
