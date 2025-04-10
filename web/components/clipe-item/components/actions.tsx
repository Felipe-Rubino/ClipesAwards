interface Props {
  children: React.ReactNode;
}

export default function ActionsComponent({ children }: Props) {
  return <div className="flex">{children}</div>;
}
