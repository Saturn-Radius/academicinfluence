import { useCallback, useState } from "react";

export default function useMoreButton() {
  const [isMore, setIsMore] = useState(false);
  const clickButton = useCallback(() => {
    setIsMore(!isMore);
  }, [setIsMore, isMore]);

  const moreButton = (
    <div
      onClick={() => clickButton()}
      css={{ fontWeight: "bold", textAlign: "center", fontSize: 16 }}
    >
      {!isMore && (
        <div>
          More
          <img src="/images/arrow-down.png" />
        </div>
      )}
      {isMore && (
        <div>
          Less
          <img src="/images/small-arrow-up.png" />
        </div>
      )}
    </div>
  );

  return { isMore, moreButton };
}
