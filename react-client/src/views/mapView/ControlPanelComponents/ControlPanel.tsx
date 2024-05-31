type ControlViewProps = {
  component: JSX.Element | null;
};

const ControlPanel = ({ component }: ControlViewProps) => component ?? null;

export default ControlPanel;
