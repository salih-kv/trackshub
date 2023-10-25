const ProfileImg = ({
  w,
  buttonStyle,
  imageStyle,
  name,
  children,
  bg,
  ...rest
}) => {
  return (
    <div className={`${buttonStyle}`} {...rest}>
      <button
        className={`flex items-center justify-center w-${w} h-${w} inline-block`}
      >
        <img
          className={`w-full h-auto rounded-full ${imageStyle}`}
          src={`https://ui-avatars.com/api/?name=${name}&length=1&bold=true&background=${
            bg || "B73D0D"
          }&color=fff&size=256`}
          alt="🤖"
        />
      </button>
      {children}
    </div>
  );
};

export default ProfileImg;
