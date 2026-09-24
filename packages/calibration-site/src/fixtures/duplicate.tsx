import type { ReactNode } from "react";

import { Document } from "../components/Document";
import type { FixtureRoute } from "../fixture-types";
import { sentinel } from "../sentinel";

const s = (id: string) => sentinel(id);

function route(id: string, body: ReactNode): FixtureRoute {
  return {
    kind: "tsx",
    path: `/experiments/duplicate/${id}/`,
    render: () => <Document head={<title>{`${id} duplication fixture`}</title>} body={body} />,
    metadata: {
      phase: 6,
      source: "src/fixtures/duplicate.tsx",
      testIds: [id],
      sentinels: { [id]: s(id) },
    },
  };
}

export const duplicateRoutes: FixtureRoute[] = [
  route(
    "DUP-001",
    <>
      <p>{s("DUP-001")}</p>
      <p>{s("DUP-001")}</p>
    </>,
  ),
  route(
    "DUP-002",
    <>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
      <p>{s("DUP-002")}</p>
    </>,
  ),
  route(
    "DUP-003",
    <>
      <a href="/duplicate-linked/">{s("DUP-003")}</a>
      <a href="/duplicate-linked/">{s("DUP-003")}</a>
    </>,
  ),
  route(
    "DUP-004",
    <>
      <nav>
        <a href="/duplicate-nav/">{s("DUP-004")}</a>
      </nav>
      <nav>
        <a href="/duplicate-nav/">{s("DUP-004")}</a>
      </nav>
    </>,
  ),
  route(
    "DUP-005",
    <>
      <div className="carousel-item">{s("DUP-005")}</div>
      <div className="carousel-item">{s("DUP-005")}</div>
    </>,
  ),
  route(
    "DUP-006",
    <>
      <div className="carousel-item">{s("DUP-006")}</div>
      <div className="carousel-item slick-cloned">{s("DUP-006")}</div>
    </>,
  ),
  route(
    "DUP-007",
    <>
      <div className="swiper-slide">{s("DUP-007")}</div>
      <div className="swiper-slide swiper-slide-duplicate">{s("DUP-007")}</div>
    </>,
  ),
  route(
    "DUP-008",
    <>
      <p>{s("DUP-008")} alpha</p>
      <p>{s("DUP-008")} beta</p>
    </>,
  ),
  route(
    "DUP-009",
    <>
      <div className="repeated-wrapper">Common wrapper text</div>
      <div className="repeated-wrapper">
        Common wrapper text <span>{s("DUP-009")}</span>
      </div>
    </>,
  ),
  route(
    "DUP-010",
    <>
      <header>{s("DUP-010")}</header>
      <main>{s("DUP-010")}</main>
    </>,
  ),
  route(
    "DUP-011",
    <>
      <main>{s("DUP-011")}</main>
      <footer>{s("DUP-011")}</footer>
    </>,
  ),
];
