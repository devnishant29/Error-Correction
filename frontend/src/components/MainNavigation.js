import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <div className="box1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </li>
            {token && (
              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  History
                </NavLink>
              </li>
            )}
          </div>
          <div className="box2">
            {!token && (
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
