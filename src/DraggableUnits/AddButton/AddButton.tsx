import * as S from "./AddButton.styles";

export const AddButton = ({ addWidget }: { addWidget: () => void }) => {
  const handleAddWidget = () => {
    addWidget();
  };

  return (
    <div className="widget">
      <S.BtnContainer className="widget" onClick={handleAddWidget}>
        <S.AddIcon>+</S.AddIcon>
      </S.BtnContainer>
    </div>
  );
};
