const Loader = ({ width, height }: { width: string; height: string }) => {
  const styles = {
    width: width,
    height: height,
  };
  return <span className="loader" style={styles}></span>;
};

export default Loader;
