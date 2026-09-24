import type { ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

const marks = (id: string) => ({
  first: sentinel(id, "FIRST"),
  second: sentinel(id, "SECOND"),
  third: sentinel(id, "THIRD"),
});

function route(id: string, body: ReactNode): FixtureRoute {
  const values = marks(id);
  return {
    kind: "tsx",
    path: `/experiments/order/${id}/`,
    render: () => <Document head={<title>{`${id} order fixture`}</title>} body={body} />,
    metadata: {
      phase: 6,
      source: "src/fixtures/order.tsx",
      testIds: [id],
      sentinels: { [id]: values.first },
      sentinelGroups: { orderedMarkers: [values.first, values.second, values.third] },
    },
  };
}

export const orderRoutes: FixtureRoute[] = [
  (() => {
    const id = "ORDER-001";
    const m = marks(id);
    return route(
      id,
      <>
        <div>{m.first}</div>
        <div>{m.second}</div>
        <div>{m.third}</div>
      </>,
    );
  })(),
  (() => {
    const id = "ORDER-002";
    const m = marks(id);
    return route(
      id,
      <div style={{ display: "flex" }}>
        <div style={{ order: 3 }}>{m.first}</div>
        <div style={{ order: 2 }}>{m.second}</div>
        <div style={{ order: 1 }}>{m.third}</div>
      </div>,
    );
  })(),
  (() => {
    const id = "ORDER-003";
    const m = marks(id);
    return route(
      id,
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <div>{m.first}</div>
        <div>{m.second}</div>
        <div>{m.third}</div>
      </div>,
    );
  })(),
  (() => {
    const id = "ORDER-004";
    const m = marks(id);
    return route(
      id,
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div style={{ gridColumn: 3 }}>{m.first}</div>
        <div style={{ gridColumn: 2 }}>{m.second}</div>
        <div style={{ gridColumn: 1 }}>{m.third}</div>
      </div>,
    );
  })(),
  (() => {
    const id = "ORDER-005";
    const m = marks(id);
    return route(
      id,
      <div style={{ position: "relative", height: 120 }}>
        <div style={{ position: "absolute", top: 80 }}>{m.first}</div>
        <div style={{ position: "absolute", top: 40 }}>{m.second}</div>
        <div style={{ position: "absolute", top: 0 }}>{m.third}</div>
      </div>,
    );
  })(),
  (() => {
    const id = "ORDER-006";
    const m = marks(id);
    return route(
      id,
      <div dir="rtl">
        <span>{m.first}</span>
        <span>{m.second}</span>
        <span>{m.third}</span>
      </div>,
    );
  })(),
  (() => {
    const id = "ORDER-007";
    const m = marks(id);
    return route(
      id,
      <>
        <button type="button" tabIndex={3}>
          {m.first}
        </button>
        <button type="button" tabIndex={2}>
          {m.second}
        </button>
        <button type="button" tabIndex={1}>
          {m.third}
        </button>
      </>,
    );
  })(),
  (() => {
    const id = "ORDER-008";
    const m = marks(id);
    return route(
      id,
      <>
        <div id="order-008-first" aria-flowto="order-008-third">
          {m.first}
        </div>
        <div id="order-008-second">{m.second}</div>
        <div id="order-008-third" aria-flowto="order-008-second">
          {m.third}
        </div>
      </>,
    );
  })(),
  (() => {
    const id = "ORDER-009";
    const m = marks(id);
    return route(
      id,
      <>
        <main>
          <div>{m.first}</div>
          <div>{m.second}</div>
        </main>
        <header style={{ position: "fixed", top: 0 }}>{m.third}</header>
      </>,
    );
  })(),
];
