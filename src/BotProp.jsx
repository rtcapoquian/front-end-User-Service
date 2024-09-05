const BotProp = ({ response }) => {
    return (
      <div>
        <div
          className="p-4 rounded-md shadow-sm bg-white text-gray-800 dark:bg-background dark:text-gray-100 whitespace-pre-wrap"
        >
          {response}
        </div>
      </div>
    );
  };
  
  export default BotProp;
  