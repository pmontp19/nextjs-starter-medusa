import { HttpTypes } from "@medusajs/types"

type ProductJsonLdProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

export default function ProductJsonLd({ product, region }: ProductJsonLdProps) {
  const variant = product.variants?.[0]
  const calculatedPrice = (variant as any)?.calculated_price

  const inStock = product.variants?.some(
    (v) => (v.inventory_quantity ?? 0) > 0 || v.inventory_quantity === null
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.title,
    image: product.images?.map((img) => img.url).filter(Boolean) || [],
    sku: variant?.sku || product.id,
    brand: {
      "@type": "Brand",
      name: product.collection?.title || "Medusa Store",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.handle}`,
      priceCurrency: calculatedPrice?.currency_code || region.currency_code,
      price: calculatedPrice?.calculated_amount
        ? (calculatedPrice.calculated_amount / 100).toString()
        : "0",
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
