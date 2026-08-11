import { FillingCylinder } from "@/components/FillingCylinder";

/**
 * Shown while a route's assets are still loading.
 *
 * Next renders this automatically during navigation — it never delays the first
 * paint of a page that is already there. On a fast connection it barely
 * appears, which is the correct behaviour for a site whose selling point is
 * that it loads quickly.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-24">
      <FillingCylinder />
    </div>
  );
}
