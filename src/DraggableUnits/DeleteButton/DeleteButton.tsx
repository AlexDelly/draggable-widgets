import { PlusRounded } from "../../Icons";
import * as S from "./DeleteButton.styles";

export const DeleteButton = ({
  deleteWidget,
}: {
  deleteWidget: (() => void) | undefined;
}) => {
  return (
    <S.BtnContainer className="widget" onClick={deleteWidget}>
      &nbsp;
      <S.CrossIcon as={PlusRounded} />
    </S.BtnContainer>
  );
};
