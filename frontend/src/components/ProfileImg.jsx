const ProfileImg = ({ w, buttonStyle, name, children, ...rest }) => {
  return (
    <div className={`${buttonStyle}`} {...rest}>
      <button className={`flex items-center justify-center w-${w} h-${w}`}>
        <img
          className="w-full h-auto rounded-full"
          src={`https://ui-avatars.com/api/?name=${name}&background=B73D0D&color=fff&size=256`}
          alt="user photo"
        />
      </button>
      {children}
    </div>
  );
};

export default ProfileImg;
