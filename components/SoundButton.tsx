interface Props {
  isAudioOn: boolean;
  onClick: () => void;
}

export const SoundButton: React.FC<Props> = ({ isAudioOn, onClick }) => {
  return (
    <button className="absolute my-10" onClick={onClick}>
      {isAudioOn ? <span>🔊</span> : <span>🔇</span>}
    </button>
  );
};
