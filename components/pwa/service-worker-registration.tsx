"use client";

import { useEffect } from "react";

const SERVICE_WORKER_URL = "/sw.js";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let isRefreshing = false;

    const handleControllerChange = () => {
      if (isRefreshing) {
        return;
      }

      isRefreshing = true;
      window.location.reload();
    };

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          SERVICE_WORKER_URL,
          {
            scope: "/",
          },
        );

        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          if (!newWorker) {
            return;
          }

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      } catch (error) {
        console.error("Falha ao registrar o service worker.", error);
      }
    };

    void registerServiceWorker();

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
    };
  }, []);

  return null;
}
