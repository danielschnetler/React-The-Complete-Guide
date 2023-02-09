import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Events">Events</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
