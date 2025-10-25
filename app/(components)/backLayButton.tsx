"use client";

//create the prop interface
interface BackLayButtonProps {
  text: string;
  onClick?: () => void;
}

const BackLayButton = ({ text, onClick }: BackLayButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default BackLayButton;
