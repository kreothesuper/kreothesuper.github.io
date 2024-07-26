<?php
/**
 * Template Name: Наши проекты
 */
get_header();
?>
<main class="content page-wrapper__content">
            <div class="content__wrapper">
                <section class="section projects">
                    <div class="section__wrapper">
                        <div class="container">
                            <div class="projects__img">
                                <video src="<?= get_field('banner'); ?>" autoplay="true" muted></video>
                            </div>
                            <div class="projects__content">
                                <div class="projects__header projects__header--small">
                                    <h2 class="title title--black--blue title--base">
                                        Наши проекты
                                    </h2>
                                    <form action="#" class="custom-select projects__select sort-select">
                                        <p class="custom-select__title">
                                            Тема:
                                        </p>
                                        <div class="custom-select__label">
                                            <p class="custom-select__current"><span class="custom-select-current">Все</span></p>
                                            <div class="custom-select__content">
                                                <label class="custom-select__item">
                                                    <input type="radio" name="project-theme"
                                                        class="custom-select__input" checked data-name="Все"
                                                        value="all">
                                                    <span>Все</span>
                                                </label>
                                                <?php
                                                $terms = get_terms( [
                                                	'taxonomy' => 'projectstx',
                                                ] );
                                                foreach($terms as $term):
                                                ?>
                                                <label class="custom-select__item">
                                                    <input type="radio" name="project-theme"
                                                        class="custom-select__input" data-name="<?= $term->name; ?>" value="<?= $term->term_id; ?>">
                                                    <span><?= $term->name; ?></span>
                                                </label>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="sort-grid">
                                    
                                <?php
                                $args = [];
                                $args['taxonomy'] = 'projectstx';
                                $args['exclude'] = 8;                                
                                $terms = get_terms($args);
                                
                                foreach($terms as $term):
                                ?>
                                    <div class="sort-grid__title sort-grid__item" data-sort="<?= $term->term_id; ?>">
                                        <p class="title title--small">
                                            <?= $term->name; ?>
                                        </p>
                                    </div>
                                    <?php
                                    $loop = new WP_Query(
                                        array(
                                            'post_type' => 'projects',
                                            'posts_per_page' => -1,
                                            'tax_query' => array(
                                                array(
                                                    'taxonomy' => 'projectstx',
                                                    'field' => 'id',
                                                    'terms' => $term->term_id
                                                )
                                            )
                                        )
                                    );
                                    while($loop->have_posts()): $loop->the_post();
                                    ?>
                                    <div class="card sort-grid__item" data-sort="<?= $term->term_id; ?>">
                                        <div class="card__wrapper card-hover">
                                            <div class="card__header">
                                                <a href="<?= get_field('outer_link') ? get_field('outer_link') : get_the_permalink(); ?>" class="card__title" <?= get_field('outer_link') ? 'target="_blank"' : ''; ?>>
                                                    <?= get_the_title(); ?>
                                                </a>
                                            </div>
                                            <div class="card__content">
                                                <p class="card__text card__text--big"><?= get_field('project_title'); ?></p>
                                                <p class="card__text"><?= get_field('project_descr'); ?></p>
                                            </div>
                                        </div>
                                    </div>
                                    <?php endwhile; wp_reset_postdata(); ?>
                                <?php endforeach; ?>
                                
                                
                                    
                                    <div class="sort-grid__title sort-grid__item" data-sort="8">
                                        <p class="title title--small">
                                            Архивные проекты
                                        </p>
                                    </div>
                                    <?php
                                    $loop = new WP_Query(
                                        array(
                                            'post_type' => 'projects',
                                            'posts_per_page' => -1,
                                            'tax_query' => array(
                                                array(
                                                    'taxonomy' => 'projectstx',
                                                    'field' => 'id',
                                                    'terms' => 8
                                                )
                                            )
                                        )
                                    );
                                    while($loop->have_posts()): $loop->the_post();
                                    ?>
                                    <a href="<?= get_the_permalink(); ?>" class="card sort-grid__item" data-sort="8">
                                        <div
                                            class="card__wrapper card__wrapper--center card__wrapper card__wrapper--small card__wrapper card__wrapper--grey">
                                            <div class="card__header card__header--center">
                                                <p
                                                    class="card__title card__title--semibold card__title--black card-hover__title">
                                                    <?= get_the_title(); ?>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                    <?php endwhile; wp_reset_postdata(); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
<?php
get_footer();
?>

<script>
        const customSelect = document.querySelector('.custom-select');

        // select из radio инпутов
        if (customSelect) {
            const customSelectCurrent = customSelect.querySelector('.custom-select-current');

            customSelect.addEventListener('click', (e) => {
                customSelect.classList.toggle('active');
            })

            customSelect.addEventListener('change', (e) => {
                customSelectCurrent.textContent = e.target.dataset.name;
                customSelect.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.custom-select')) {
                    customSelect.classList.remove('active');
                }
            });
        }

        // инициализация сортировки

        const sortGrid = document.querySelector('.sort-grid');
        const iso = new Isotope(sortGrid, {
            itemSelector: '.sort-grid__item',
            layoutMode: 'fitRows',
            getSortData: {
                number: '[data-number]',
            },
        });

        const sortSelect = document.querySelector('.sort-select');
        const gridTitle = document.querySelectorAll('.sort-grid__title');
        const gridBlock = document.querySelectorAll('.sort-grid__item');
        const gridBlockNotTitle = document.querySelectorAll('.sort-grid__item:not(.sort-grid__title)')

        //  клик для мобильных устройств
        gridTitle.forEach(title => {
            title.addEventListener('click', () => {
                const themeName = title.dataset.sort;
                title.classList.toggle('active');
                gridBlockNotTitle.forEach(block => {
                    if (themeName === block.dataset.sort) {
                        block.classList.toggle('hidden');
                    }
                });
                iso.arrange({ sortBy: 'number' });
            });
        });

        //  основная сортировка
        sortSelect.addEventListener('change', (e) => {
            const currentSortLabel = e.target.value;
            gridTitle.forEach(title => {
                title.classList.remove('active');
            });
            if (currentSortLabel === 'all') {
                gridBlock.forEach(block => {
                    block.dataset.number = '1';
                    block.classList.remove('sort-grid__item--hidden');
                });
                gridTitle.forEach(el => {
                    el.classList.remove('hidden');
                });
            } else {
                gridBlock.forEach(block => {
                    block.classList.remove('hidden');
                    const currentCondition =  block.dataset.sort === currentSortLabel;

                    block.classList.toggle('sort-grid__item--hidden', !currentCondition)
                    block.dataset.number = currentCondition ? '1' : '2';
                });
                gridTitle.forEach(el => {
                    el.classList.add('hidden');
                })
            }
            iso.updateSortData(gridBlock)
            iso.arrange({ sortBy: 'number' });
        });
    </script>