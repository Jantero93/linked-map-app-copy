type ControlPanelProps = {
  component: JSX.Element | null;
};

const ControlPanel = ({ component }: ControlPanelProps) => component ?? null;

export default ControlPanel;
