const ProfileImg = ({
  w,
  buttonStyle,
  imageStyle,
  profileURL,
  name,
  children,
  bg,
  ...rest
}) => {
  const src = profileURL
    ? profileURL
    : `https://ui-avatars.com/api/?name=${name}&length=1&bold=true&background=${
        bg || "B73D0D"
      }&color=fff&size=256`;

  return (
    <div className={`${buttonStyle}`} {...rest}>
      <button
        className={`flex items-center justify-center w-${w} h-${w} inline-block`}
      >
        <img
          className={`w-full h-auto rounded-full ${imageStyle}`}
          src={src}
          alt="🤖"
        />
      </button>
      {children}
    </div>
  );
};

export default ProfileImg;
