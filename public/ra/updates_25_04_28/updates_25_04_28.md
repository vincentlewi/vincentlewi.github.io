#  Vincent's Updates – 28 Apr 2025 

So far, the only truly successful model is the `google/ddpm-ema-celebahq-256` (the first one that I tried). It seems that the **disentangled** and **linear** properties of DDPM only applies to this model. Another paper [1] shows that they can manipulate the H-space of many different models; however, they used CLIP loss as guidance, which is image-specific and requires prompts, instead of the no-prompt, multi-image aggregation approach used by the naive and our VAE-based method. This might explain why [2], which is similar to the naive approach, only mentions this model in their paper.

## Diffusion Models on Pixel Space
### Google DDPM (CelebA-HQ)
| ![google_example](ra/updates_25_04_28/google_example.png) |
|---|
| Our method works beautifully for this model. |


### OpenAI ADM (MetFaces)
| ![metfaces_example](/ra/updates_25_04_28/metfaces_example.png) |
|---|
| Failed edit from painting to grayscale painting. |

### OpenAI ADM (AFHQ-Dog)
| ![afhq_dog_smile_example](/ra/updates_25_04_28/afhq_dog_smile_example.png) |
|---|
| Failed example using positive samples of happy dogs from different breeds. |

| ![afhq_dog_samoyed_smile_example](/ra/updates_25_04_28/afhq_dog_samoyed_smile_example.png) |
|---|
| Editing a happy dog is possible, but needs positive samples from the same breed. |

## CompVis Latent Diffusion Model
| ![ldm_example](/ra/updates_25_04_28/ldm_example.png) |
|---|
| Manipulating the H-space on latent diffusion models has almost no effect, even on models trained on the same CelebA-HQ dataset. |

## Stable Diffusion
Editing images by simply replacing (or blending) the H-space of an image works on all previous models, but on Stable Diffusion, there is an imperceptible change.
| ![UNet Skip Connection](/ra/updates_25_04_28/unet_skip.png) |
|---|
| Visualization of the effect of switching each group of skip connections. The h-space has an almost imperceptible effect on the final image, contrary to research into the disentanglement of DDPMs. The first group of skip connections closest to the h-space similarly has a limited effect, whereas the most coherent blending occurs in the second group of skip connections. The third group has no coherent effect on the image, generating random distortions, while the fourth performs akin to raw pixel blending [3]. |

## FLUX
Not possible due to the inherent difference in architecture. There is no UNet in DiT, hence no H-space.

## References
[1] M. Kwon, J. Jeong, and Y. Uh, “Diffusion Models already have a Semantic Latent Space,” arXiv.org, Oct. 20, 2022. https://arxiv.org/abs/2210.10960

[2] R. Haas, I. Huberman-Spiegelglas, R. Mulayoff, S. Graßhof, S. S. Brandt, and T. Michaeli, “Discovering interpretable directions in the semantic latent space of diffusion models,” arXiv.org, Mar. 20, 2023. https://arxiv.org/abs/2303.11073

[3] L. Schaerf, A. Alfarano, F. Silvestri, and L. Impett, “Training-Free style and content transfer by leveraging U-Net skip connections in stable diffusion,” arXiv.org, Jan. 24, 2025. https://arxiv.org/abs/2501.14524
‌