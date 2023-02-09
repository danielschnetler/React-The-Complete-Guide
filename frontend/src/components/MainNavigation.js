import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <a
              href="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/Events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Events
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
